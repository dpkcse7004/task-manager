package com.deepak.task_manager.Controller;

import com.deepak.task_manager.model.Task;
import com.deepak.task_manager.Repository.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")  // allow frontend calls
public class TaskController {

    private final TaskRepository repo;

    public TaskController(TaskRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Task> getAll() {
        return repo.findAll();
    }


    @PostMapping
    public Task create(@RequestBody Task task) {

        task.setCompleted(false);

        task.setCreatedDate(LocalDate.now());

        if (task.getDescription() == null) task.setDescription("");

        return repo.save(task);
    }

    @PutMapping("/{id}")
    public Task toggle(@PathVariable Long id) {
        Task t = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        t.setCompleted(!t.isCompleted());
        return repo.save(t);
    }

    @PutMapping("/updateDescription/{id}")
    public Task updateDescription(@PathVariable Long id, @RequestBody Task updatedTask) {
        Task task = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setDescription(updatedTask.getDescription());
        return repo.save(task);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }


}
