# [EARP](https://elmiasangga-agna.com/), a simulator for complex problem

Input files can be found at https://drive.google.com/drive/folders/1NthfB-66HHHrbS-ckzPT6WI5jEtpehn9?usp=sharing.

## Roles

There are two roles in EARP: administrator and non-administrator. Administrators can add a user, edit a user's access to services, roles, and time limit per run, as well as remove a user within your organization.

## Services

The services assigned to the user need to be entered in the text, each separated by a comma. The following services are available in EARP:
- project: project-related services such as project scheduling, crashing, visualization, and task assignments, where **the credits consumed will be equal to the number of tasks in the project**. Its API documentation is at https://documenter.getpostman.com/view/15994165/2sB2x9iALW.

## Project Name

The name of your project. Once your project is scheduled, you'll be given an ID via email to retrieve your project schedule.

## Project Start

The start time of your project, in simplified ISO 8601, YYYY-MM-DD HH:MM:SS (e.g., 2025-06-01 00:00:00).

## Project End

The desired end time of your project, in simplified ISO 8601, YYYY-MM-DD HH:MM:SS (e.g., 2025-06-01 00:00:00).

## Project Tasks for Project Scheduling

A CSV file containing the tasks of the project. The file should contain the columns:
- name: the name of the task
- duration: the task duration, either in days or hours
- priority: the task priority as an integer with the smaller number representing the higher priority
- ready_start: the earliest time that the task can start, in simplified ISO 8601, YYYY-MM-DD HH:MM:SS (e.g., 2025-06-01 00:00:00), leave every cell corresponding to the task that doesn't have it empty
- ready_end: the earliest time that the task can inclusively end, in simplified ISO 8601, YYYY-MM-DD HH:MM:SS (e.g., 2025-06-01 00:00:00), leave every cell corresponding to the task that doesn't have it empty
- due_start: the latest time that the task can inclusively start, in simplified ISO 8601, YYYY-MM-DD HH:MM:SS (e.g., 2025-06-01 00:00:00), leave every cell corresponding to the task that doesn't have it empty
- due_end: the latest time that the task can inclusively end, in simplified ISO 8601, YYYY-MM-DD HH:MM:SS (e.g., 2025-06-01 00:00:00), leave every cell corresponding to the task that doesn't have it empty

## Project Dependencies
A CSV file containing the dependencies of the project. The file should contain the columns:
- activity: the name of the task
- predecessor: the predecessor task of the activity
- relationship: the relationship between the activity and its predecessor (Finish-to-Start (FS), Start-to-Start (SS), Start-to-Finish (SF), Finish-to-Finish (FF))
- is_minimum_lag: True (the activity needs to lag by at least the amount given by the lag column) or False (the activity needs to lag by at most the amount given by the lag column)
- lag: the amount of lag as an integer given either in days for a long project or hours for a short project, negative lag is lead

## Project Resources
A CSV file containing the resources available for the project. The file should contain the columns:
- name: the name of the resource
- quantity: the quantity of the resource

## Task Requirements
A CSV file containing the resource requirements for each task in the project. The file should contain the columns:
- task: the name of the task
- resource: the name of the resource
- quantity: the amount of the resource required by the task

## Resource Unavailabilities
A CSV file containing the periods in which resources become unavailable. The file should contain the columns:
- resource: the name of the resource
- unavailable_from: the period in which the resource will be unavailable from, inclusive of unavailable_from
- unavailable_to: the period in which the resource will be unavailable to, exclusive of unavailable_to
- quantity: the amount of the resource that won't be available

## Holidays
A CSV file containing the holidays. The file should contain the columns:
- start: the period in which the holiday will be starting from, inclusive of the start
- end: the period in which the holiday will be starting from, exclusive of the end

## Weekends
The list of weekend days for long project.

## Breaks
The list of the break hours for short project.

## Budget

Budget is the capital available for crashing the project.

## Project Type

The duration of long project is in days, while for short project it is in hours.

## Project Tasks for Project Crashing

A CSV file containing the tasks of the project. The file should contain the columns:
- name: the name of the task
- duration: the task duration as an integer in either days for a long project or hours for a short project
- ready_start: the earliest time that the task can start, in simplified ISO 8601, YYYY-MM-DD HH:MM:SS (e.g., 2025-06-01 00:00:00), leave every cell corresponding to the task that doesn't have it empty
- ready_end: the earliest time that the task can inclusively end, in simplified ISO 8601, YYYY-MM-DD HH:MM:SS (e.g., 2025-06-01 00:00:00), leave every cell corresponding to the task that doesn't have it empty
- due_start: the latest time that the task can inclusively start, in simplified ISO 8601, YYYY-MM-DD HH:MM:SS (e.g., 2025-06-01 00:00:00), leave every cell corresponding to the task that doesn't have it empty
- due_end: the latest time that the task can inclusively end, in simplified ISO 8601, YYYY-MM-DD HH:MM:SS (e.g., 2025-06-01 00:00:00), leave every cell corresponding to the task that doesn't have it empty

## Project Crashing Costs

A CSV file containing the tasks of the project. The file should contain the columns:
- task: the name of the task
- cost: the cost for crashing the project for one day (for long project) or one hour (for short project), with the first entry being the cost of crashing the task for the first time, the second entry being the cost of crashing the task for the second time, etc.

## Requirements for Task Assignment

A CSV file containing the skill requirements for each task of the project. The file should contain the columns:
- task: the name of the task
- skill: the skill required for the task
- quantity: the number of people with the skill that are required by the task

## Project Tasks for Task Assignment

A CSV file containing the tasks of the project. The file should contain the columns:
- name: the name of the task
- start: the start time of the task
- end: the end time of the task

## Assignees

A CSV file containing the assignees for the project. The file should contain the columns:
- name: the name of the person working on the project
- skill: the skill that the person has

## Baseline Schedule
A CSV file containing the baseline schedule for the project. The file should contain the columns:
- task: the name of the task
- planned_start: the planned start time of the task
- planned_end: the planned end time of the task

## Actual Schedule
A CSV file containing the actual schedule for the project. The file should contain the columns:
- task: the name of the task
- actual_start: the actual start time of the task
- actual_end: the actual end time of the task
