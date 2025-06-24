package com.coursecompass.backend_spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PlanDTO {

    private String nodesJson;
    private String edgesJson;

}
