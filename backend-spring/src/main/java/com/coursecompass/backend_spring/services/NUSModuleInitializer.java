package com.coursecompass.backend_spring.services;

import com.coursecompass.backend_spring.dto.NUSModsDTO;
import com.coursecompass.backend_spring.dto.NUSModsSummaryDTO;
import com.coursecompass.backend_spring.entities.NUSModule;
import com.coursecompass.backend_spring.repositories.NUSModuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
@RequiredArgsConstructor
public class NUSModuleInitializer implements CommandLineRunner {

  private final RestTemplate restTemplate = new RestTemplate();
  private final NUSModuleRepository moduleRepository;

  private static final String BASE_URL = "https://api.nusmods.com/v2/2024-2025";

  @Override
  public void run(String... args) throws Exception {
    // Exit if the DB already has data
    if (moduleRepository.count() > 0) return;

    String infoUrl = BASE_URL + "/moduleInfo.json";
    ResponseEntity<NUSModsDTO[]> response = restTemplate.getForEntity(infoUrl, NUSModsDTO[].class);
    NUSModsDTO[] modules = response.getBody();

    if (modules == null) {
      System.err.println("No modules received from NUSMods API.");
      return;
    }

    for (NUSModsDTO detail : modules) {
      try {
        String mcStr = detail.getModuleCredit();
        if (mcStr == null || mcStr.isEmpty()) {
          System.err.println("Skipping module " + detail.getModuleCode() + " due to empty MC");
          continue;
        }
        double mcDouble;
        try {
          mcDouble = Double.parseDouble(mcStr);
        } catch (NumberFormatException e) {
          System.err.println("Skipping module " + detail.getModuleCode() + " due to invalid MC: " + mcStr);
          continue;
        }
        int mc = (int) Math.floor(mcDouble);

        NUSModule module = new NUSModule(
                detail.getModuleCode(),
                detail.getTitle(),
                mc,
                detail.getAttributes() != null && detail.getAttributes().isSu(),
                detail.getFaculty(),
                detail.getSemesterData().stream().map(sd -> sd.getSemester()).toList()
        );

        moduleRepository.save(module);

      } catch (Exception e) {
        System.err.println("Failed to save module " + detail.getModuleCode() + ": " + e.getMessage());
      }
    }
  }
}
