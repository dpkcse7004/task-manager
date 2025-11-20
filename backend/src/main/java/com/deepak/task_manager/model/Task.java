package com.deepak.task_manager.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private boolean completed;

    private String description;


    private LocalDate createdDate;

    // New Feature 2: Scheduled Date + Time
    private LocalDateTime scheduledDateTime;
}
