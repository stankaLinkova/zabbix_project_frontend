## Description

This project consists of two parts:
 - backend: https://gitlab.science.upjs.sk/matusrevicky/zabbix_api_backend
 - frontend: https://gitlab.science.upjs.sk/stanka/zabbix_project_frontend

First of all, run the backend by following the instructions: https://gitlab.science.upjs.sk/matusrevicky/zabbix_api_backend/-/blob/master/README.md  
After successful start of the backend, it's time for the frontend.

## Setup
Follow below steps to run project

1. Clone repository
2. Run `npm i` command to install dependencies
3. Execute `npm start` command to run the project
The project runs on localhost:3001.

## Create a map in zabbix
1. Log in with default credentials.  
URL: http://127.0.0.1  
Username: Admin  
Password: zabbix  

![login](/images/login.png)


2. Choose the group of hosts.

![table_of_groups_of_hosts](/images/group_of_hosts.png)

![table_of_groups_of_hosts2](/images/group_of_hosts2.png)



3. In the table of hosts, you will either see the link to already created map or it doesn't exists, so you may choose a host and get map for it.

![host_map](/images/host_map.png)
![host_map2](/images/host_no_map.png)
![map](/images/map.png)

If you click on the link, it redirects you to the zabbix, where the map is created.






