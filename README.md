# Welcome to the documentation of [Elmiasangga Agna Resource Planner](https://elmiasangga-agna.com/), the ultimate project scheduling tool.

Elmiasangga Agna Resource Planner (EARP) offers a comprehensive suite of functionalities designed to streamline project management and optimize resource utilization. It supports complex task dependencies, including start-start, start-finish, finish-finish, and finish-start relationships, complete with lead and lag adjustments to ensure flexibility and precision in scheduling. The planner incorporates automatic scheduling that considers resource constraints, enabling seamless task allocation and timeline optimization. Additionally, its robust project dashboard provides visual tools like Gantt charts, resource profile plots, and more, offering teams clear insights into project progress and resource usage at a glance. Together, these features make EARP a powerful tool for managing projects with efficiency and accuracy. With EARP, one can:

- [insert project](##Insert Project)
- [manage users](##Users Management)
- [manage subscriptions](##Subscriptions Management)
- [access project dashboard](##Project Dashboard)
- [access project workspace](##Project Workspace)
- [manage tasks](##Tasks Management)

Users who sign up for an EARP account will be granted an administrator account. Only one person is required to register an organization. The administrator can then add additional members to the organization with various roles, including the administrator role. Each user can hold only one role at a time. The currently available roles in EARP are as follows:

- administrator
- leader
- member
- guest

### Administrator

An administrator is vital to the organization, responsible for tasks such as adding and removing users, as well as managing subscriptions. Upon user signup, the organization benefits from an unlimited number of free trial subscriptions available for a defined period, which can be allocated as necessary. Furthermore, administrators possess the authority to create projects, access any project dashboard and workspace, assign project leaders, and appoint guests to various projects.

### Leader

In the project workspace, leaders hold a crucial role in task management. They can assign tasks to multiple team members, ensuring that at least one of the assignees possesses the leader role, which allows for effective oversight and accountability. Each task can include relevant links that are visible to all project participants, fostering transparency and collaboration.

Moreover, leaders have the authority to review each task within the workspace, enabling them to monitor progress and provide feedback. A dedicated project dashboard is available, offering a comprehensive view of the project's schedule and resource allocation. This functionality equips leaders with the ability to manage and track their team's activities efficiently, allowing them to make informed decisions based on real-time updates and data. Overall, this setup promotes effective leadership and enhances the overall project management process.

### Member

Members can collaborate on tasks related to their assigned projects. If a member is designated as the leader for a specific task, they will have exclusive permissions to update the task status. This ensures clear accountability and streamlined progress tracking.

### Guest

Guests can access the project workspace and the dashboards for the projects they are assigned to. This allows them to collaborate effectively and stay updated on progress, tasks, and any critical information relevant to their role in the project.

## Insert Project

Only [administrators](###administrator) can insert projects. To insert a project, the following information is required:

- **Weekends**
- **Project Details:**
  - Project name
  - Project start date
  - Project end date
- **Task Details:**
  - Name of the column containing the name of each task (must be unique).
  - Name of the column containing the earliest start date of each task (must be present in the CSV file, can be empty).
  - Name of the column containing the latest start date of each task (must be present in the CSV file, can be empty).
  - Name of the column containing the earliest end date of each task (must be present in the CSV file, can be empty).
  - Name of the column containing the latest end date of each task (must be present in the CSV file, can be empty).
  - Name of the column containing the duration of each task in days.
  - CSV file containing task information with the specified column headers.
- **Resource Requirement Details:**
  - Name of the column containing the name of each task.
  - Name of the column containing the required resource name.
  - Name of the column containing the required resource quantity.
  - CSV file containing resource requirements for each task with the specified column headers.
- **Available Resource for the Project Details:**
  - Name of the column containing the name of the available resource (must be unique).
  - Name of the column containing the quantity of the available resource.
  - CSV file containing available resources with the specified column headers.
- **Details on Resource Unavailability:**
  - Name of the column containing the start date when a resource becomes unavailable.
  - Name of the column containing the end date when a resource becomes unavailable.
  - Name of the column containing the unavailable resource name.
  - Name of the column containing the unavailable resource quantity.
  - CSV file containing information on resource unavailability with the specified column headers.
- **Task Dependency Details:**
  - Name of the column containing the predecessor task's name.
  - Name of the column containing the successor task's name.
  - Name of the column containing the minimal lag in days (must be present in the CSV file, can be empty).
  - Name of the column containing the type of dependency (SS, SF, FS, FF) for minimal lag (must be present in the CSV file, can be empty).
  - Name of the column containing the maximal lag in days (must be present in the CSV file, can be empty).
  - Name of the column containing the type of dependency (SS, SF, FS, FF) for maximal lag (must be present in the CSV file, can be empty).
  - CSV file containing information on dependencies between tasks with the specified column headers.
