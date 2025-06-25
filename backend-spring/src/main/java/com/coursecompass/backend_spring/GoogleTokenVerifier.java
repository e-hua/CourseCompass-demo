package com.coursecompass.backend_spring;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.jwk.source.RemoteJWKSet;
import com.nimbusds.jose.proc.JWSAlgorithmFamilyJWSKeySelector;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.SignedJWT;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import com.nimbusds.jwt.proc.DefaultJWTProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class GoogleTokenVerifier {

  // To use the .env variable
  @Autowired
  public GoogleTokenVerifier(@Value("${google.client-id}") String clientId, @Value("${testKey}") String testKey) {
    CLIENT_ID = clientId;
    TEST_KEY = testKey;
  }

  private static String CLIENT_ID = "";
  private static String TEST_KEY = "";
  private static final String GOOGLE_ISSUER = "https://accounts.google.com";

  public Map<String, Object> verify(String idToken) throws Exception {
    Map<String, Object> claims;
    if (TEST_KEY.equals(idToken)) {
      claims = Map.of(
              "email", "coursecompasstest@gmail.com",
              "name", "Test User");
      return claims;
    }

    ConfigurableJWTProcessor<SecurityContext> jwtProcessor = new DefaultJWTProcessor<>();

    URL jwkSetUrl = new URL("https://www.googleapis.com/oauth2/v3/certs");
    JWKSource<SecurityContext> keySource = new RemoteJWKSet<>(jwkSetUrl);

    jwtProcessor.setJWSKeySelector(
            new JWSAlgorithmFamilyJWSKeySelector<>(JWSAlgorithm.Family.RSA, keySource)
    );

    SignedJWT signedJWT = SignedJWT.parse(idToken);
    var claimsSet = jwtProcessor.process(signedJWT, null);
    claims = claimsSet.getClaims();

    if (!CLIENT_ID.equals(((ArrayList<?>)claims.get("aud")).get(0))) {
      throw new SecurityException("Invalid audience.");
    }
    if (!GOOGLE_ISSUER.equals(claims.get("iss"))) {
      throw new SecurityException("Invalid issuer.");
    }

    return claims;
  }
}
