# Welcome to the documentation of [Elmiasangga Agna Resource Planner](https://elmiasangga-agna.com/), the ultimate project scheduling tool.

Elmiasangga Agna Resource Planner (EARP) offers a comprehensive suite of functionalities designed to streamline project management and optimize resource utilization. It supports complex task dependencies, including start-start, start-finish, finish-finish, and finish-start relationships, complete with lead and lag adjustments to ensure flexibility and precision in scheduling. The planner incorporates automatic scheduling that considers resource constraints, enabling seamless task allocation and timeline optimization. Additionally, its robust project dashboard provides visual tools like Gantt charts, resource profile plots, and more, offering teams clear insights into project progress and resource usage at a glance. Together, these features make EARP a powerful tool for managing projects with efficiency and accuracy. With EARP, one can:

- [insert project](#Insert-Project)
- [manage users](#Users Management)
- [manage subscriptions](#Subscriptions Management)
- [access project dashboard](#Project Dashboard)
- [access project workspace](#Project Workspace)
- [manage tasks](#Tasks Management)

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

Only [administrators](#administrator) with either the Project Management System 30-days Plan, Project Management System 365-days Plan, or the Trial Plan are permitted to insert projects. To insert a project, the following information is required:

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

## Manage Users

Only [administrators](#administrator) can manage users. To insert users, the following information is required:

- Name of the column containing the email of the user to be added.
- Name of the column containing the role (admin, leader, member, guest) of the user to be added.
- A CSV file containing information on users to be added with the specified column headers.

To remove users, the following information is required:

- Name of the column containing the email of the user to be removed.
- A CSV file containing information on users to be removed with the specified column headers.

## Manage Subscriptions

Only [administrators](#administrator) can manage subscriptions. The top table on the page displays the type and number of subscriptions that can be assigned.

To purchase subscriptions, an administrator needs to enter the number of subscriptions next to the type they want to buy in the bottom table. After that, they can calculate the total price by pressing the CALCULATE TOTAL PRICE button. Please note that purchases are non-refundable. To continue with the purchase, the administrator should click the PAY button, which will direct them to a page showing the details of the transaction. If they wish to abort the purchase, they can press the RETURN TO HOME PAGE button. Otherwise, they can proceed by clicking the PayPal button and providing the necessary details for the purchase.

To assign subscriptions, an administrator needs to enter the following information:

- Name of the column containing the email of the user to be assigned a subscription.
- Name of the column containing the subscription to be assigned to the user.
- A CSV file containing information on subscription assignments with the specified column headers.

## Project Dashboard

The project dashboard is available to users with the roles of [administrator](#administrator), [leader](#leader), and [guest], provided they are on one of the following plans: ProjectManagementSystem 30-days Plan, ProjectManagementSystem 365-days Plan, or the Trial Plan. Users can view schedules and resource profiles for various projects to which they have access. The [administrator](#administrator) has the capability to directly assign leaders and guests to projects through the project dashboard.

## Project Workspace

The project workspace is accessible to users in any role as long as they are subscribed to one of the following plans: ProjectManagementSystem 30-days Plan, ProjectManagementSystem 365-days Plan, or the Trial Plan. [Members](#member) designated as leaders for a task can update the task, while [leaders](#leader) of projects have the ability to review any task within the projects they are assigned to. [Guests](#guest) and [administrators](#administrator) can only monitor project progress, with guests limited to projects they are assigned to, whereas administrators have visibility into all projects.

## Manage Tasks

Only [leaders](#leader) with either the Project Management System 30-day Plan, Project Management System 365-day Plan, or the Trial Plan can manage tasks. To manage tasks, the following information is required:

- Project name
- Name of the column containing assignees' emails
- Name of the column containing the task's name (which needs to be unique)
- Name of the column containing task links
- Name of the column containing the email of the leader for the assignees
- Name of the column containing the status of the task
- Name of the column containing the review result of the task
- A CSV file containing information on assignments with the specified column headers
