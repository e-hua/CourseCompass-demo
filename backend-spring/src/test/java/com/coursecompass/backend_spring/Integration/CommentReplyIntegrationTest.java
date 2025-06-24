package com.coursecompass.backend_spring.Integration;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;

import com.coursecompass.backend_spring.dto.comments.CommentReadDTO;
import com.coursecompass.backend_spring.dto.comments.CommentReplyReadDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest
@AutoConfigureMockMvc
public class CommentReplyIntegrationTest {
  @Autowired
  private MockMvc mockMvc;
  @Autowired
  private ObjectMapper objectMapper;


  @Test
  void testGettingCourseCommentReply() throws Exception {
    MvcResult result = mockMvc.perform(get("/api/comments/ABM5001"))
            .andExpect(status().isOk())
            .andReturn();

    String json = result.getResponse().getContentAsString();

    List<CommentReadDTO> comments = objectMapper.readValue(
            json,
            objectMapper.getTypeFactory().constructCollectionType(List.class, CommentReadDTO.class)
    );

    CommentReadDTO comment = comments.get(0);
    Long commentId = comment.getId();

    MvcResult replyResult = mockMvc.perform(get("/api/commentReplies/" + commentId))
            .andExpect(status().isOk())
            .andReturn();

    String replyJson = replyResult.getResponse().getContentAsString();

    List<CommentReplyReadDTO> commentReplies = objectMapper.readValue(
            replyJson,
            objectMapper.getTypeFactory().constructCollectionType(List.class, CommentReplyReadDTO.class)
    );

    assertEquals(1, commentReplies.size());
    CommentReplyReadDTO commentReply = commentReplies.get(0);
    assertEquals("dummy@example.com", commentReply.getAuthorEmail());
    assertEquals("Thanks for the comment! This is a dummy reply.", commentReply.getContent());
  }
}
