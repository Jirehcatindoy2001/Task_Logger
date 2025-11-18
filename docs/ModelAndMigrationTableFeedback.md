# Task

** ~Task Model~ **
- [] Remove casts on 'updated_at' && 'created_at' in Task::Model. It is a redundant array value of 'timestamps()' column in `create_tasks_table.php[Task::Model]`

** ~Task Migration Table~ **
- [] Create an index for ['user_id', 'title'] column/s for future search query feature
- [] Update outdated `->onDelete('cascade')`. Make it `->cascadeOnDelete()`, this is the updated cascade on delete feature of Laravel



#Task Log

** ~Task Log Model~ **
- [] Remove user 'user()' ORM, unecessary Eloquent ORM.
- [] Remove casts on 'updated_at' && 'created_at' in TaskLog::Model. It is a redundant array value of 'timestamps()' column in `task_logs_table.php[TaskLog::Model]`


** ~Task Log Migration Table~ **
- [] Remove 'user_id' relationship to [User::Model]. Unecessary Eloquent: Relationship, `task_log_table[TaskLog Model]` to `user_table[User Model]`.
=============================================================================
```php
//Relation should from User to Task should be like this
User::Model -> Task::Model(TaskLog::Model)

TaskLog::Model is array value of that belongs to a specific Task::Model->id
```
=============================================================================


# User

** ~User Migration Table~ **
- [] Add a 'role' enum column