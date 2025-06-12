package com.coursecompass.backend_spring.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Entity
@Table(name = "modules")
@AllArgsConstructor
@NoArgsConstructor
public class NUSModule {
  @Id
  private String moduleCode;

  private String title;
  private int moduleCredit;
  private boolean su;
  private String faculty;

  @ElementCollection(fetch = FetchType.EAGER)
  @CollectionTable(name = "module_semesters", joinColumns = @JoinColumn(name = "module_code"))
  @Column(name = "semester")
  private List<Integer> semesters;
}
