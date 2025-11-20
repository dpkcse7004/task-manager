package com.deepak.task_manager.Repository;

import com.deepak.task_manager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}

