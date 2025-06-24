package com.coursecompass.backend_spring;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;

import com.coursecompass.backend_spring.dto.CoursePreviewDTO;
import com.coursecompass.backend_spring.dto.PageDTO;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest
@AutoConfigureMockMvc
public class CoursePreviewIntegrationTest {

  @Autowired
  private MockMvc mockMvc;
  @Autowired
  private ObjectMapper objectMapper;

  @Test
  void testGettingWithoutFilter() throws Exception {
    MvcResult result = mockMvc.perform(get("/api/coursePreviews"))
            .andExpect(status().isOk())
            .andReturn();

    String json = result.getResponse().getContentAsString();

    JavaType pageType = objectMapper.getTypeFactory()
            .constructParametricType(PageDTO.class, CoursePreviewDTO.class);

    PageDTO<CoursePreviewDTO> pageDto = objectMapper.readValue(json, pageType);

    List<CoursePreviewDTO> contentList = pageDto.getContent();

    assertEquals("ABM5001", contentList.get(0).getCourseCode());
  }

  @Test
  void testGettingWithFilter() throws Exception {
    MvcResult result = mockMvc.perform(get("/api/coursePreviews?search=CS2030S"))
            .andExpect(status().isOk())
            .andReturn();

    String json = result.getResponse().getContentAsString();

    JavaType pageType = objectMapper.getTypeFactory()
            .constructParametricType(PageDTO.class, CoursePreviewDTO.class);

    PageDTO<CoursePreviewDTO> pageDto = objectMapper.readValue(json, pageType);

    List<CoursePreviewDTO> contentList = pageDto.getContent();

    assertEquals("CS2030S", contentList.get(0).getCourseCode());
    assertEquals(1, contentList.size());
  }
}
