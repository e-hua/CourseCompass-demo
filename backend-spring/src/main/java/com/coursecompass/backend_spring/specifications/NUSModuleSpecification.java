package com.coursecompass.backend_spring.specifications;

import com.coursecompass.backend_spring.dto.CoursePreviewFilter;
import com.coursecompass.backend_spring.entities.NUSModule;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class NUSModuleSpecification {

  public static Specification<NUSModule> build(CoursePreviewFilter filter, Set<String> allowedModuleCodes) {
    return (root, query, cb) -> {
      List<Predicate> predicates = new ArrayList<>();

      if (filter.getSearch() != null && !filter.getSearch().isBlank()) {
        String searchLower = "%" + filter.getSearch().toLowerCase() + "%";
        predicates.add(cb.or(
                cb.like(cb.lower(root.get("moduleCode")), searchLower)
        ));
      }

      if (filter.getFaculty() != null && !filter.getFaculty().isBlank()) {
        predicates.add(cb.equal(root.get("faculty"), filter.getFaculty()));
      }

      if (filter.getSu() != null) {
        predicates.add(cb.equal(root.get("su"), filter.getSu()));
      }

      if (filter.getSemesters() != null && !filter.getSemesters().isEmpty()) {
        // semester filtering using element collection
        predicates.add(root.join("semesters").in(filter.getSemesters()));
      }

      if (allowedModuleCodes != null && !allowedModuleCodes.isEmpty()) {
        predicates.add(root.get("moduleCode").in(allowedModuleCodes));
      }

      return cb.and(predicates.toArray(new Predicate[0]));
    };
  }
}
