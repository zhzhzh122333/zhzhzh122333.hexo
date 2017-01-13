---
title: CentOS下安装MySQL
date: 2016-06-29 10:45:36
categories: [MySQL]
tags: [Linux,MySQL]
---

>系统：CentOS 6.5桌面版
>版本：MySQL 5.6.25

## 删除自带mysql
执行以下命令，注意大小写，如果mysql不行就换MySQL
```
rpm  -qa | grep  mysql
rpm -e --nodeps [包名]
```
卸载后原mysql中的数据及配置不会删除，如果确定没用后就手工删除
```
rm -f /usr/my.cnf
rm -Rf /var/lib/mysql
```
如图
{% img /images/mysql-init/1.png 删除mysql %}

<!-- more -->

## 下载并解压mysql安装包
执行以下命令
```
mkdir mysql
tar -xvf MySQL-5.6.25-1.linux_glibc2.5.x86_64.rpm-bundle.tar -C ./mysql/
cd mysql
```
如图
{% img /images/mysql-init/2.png 解压mysql安装包 %}


## 安装mysql
一般安装server和client即可，其他可根据需要安装
```
rpm -ivh MySQL-server-5.6.25-1.linux_glibc2.5.x86_64.rpm
```
如图
{% img /images/mysql-init/3.png 安装mysql %}
```
rpm -ivh MySQL-client-5.6.25-1.linux_glibc2.5.x86_64.rpm
rpm -ivh MySQL-devel-5.6.25-1.linux_glibc2.5.x86_64.rpm
rpm -ivh MySQL-shared-compat-5.6.25-1.linux_glibc2.5.x86_64.rpm
```
如图
{% img /images/mysql-init/4.png 安装mysql %}


## 修改mysql默认字符编码
编辑mysql配置文件/usr/my.cnf，加入以下内容
```
[client]
default-character-set=utf8
[mysqld]
character-set-server=utf8
```
如图
{% img /images/mysql-init/5.png 安装mysql %}


## 初始化数据库
执行以下命令
```
/usr/bin/mysql_install_db
```
如图
{% img /images/mysql-init/6.png 初始化数据库 %}


## 运行mysql，并修改密码
先开启mysql服务，mysql的初始密码在/root/.mysql_secret文件内，执行以下命令
```
service mysql start
cat /root/.mysql_secret
mysql -uroot -pp6_lTG87T5z5nuTe
```
进入mysql命令行后，修改密码
```
set password = password('123456');
```
如图
{% img /images/mysql-init/7.png 运行并修改密码 %}


## 设置允许远程登录
在mysql命令行下执行
```
use mysql;
select host,user,password,password_expired from user;
update user set password = password('123456') where user = 'root';
update user set password_expired = 'N' where user = 'root';
update user set host = '%' where user = 'root' and host = 'localhost';
flush privileges;
exit
```
如图
{% img /images/mysql-init/8.png 设置允许远程登录 %}


## 附录
如果遇到下面这个错误
```
ERROR 1820 (HY000): You must SET PASSWORD before executing this statement
```
先设置密码，再执行查询
```
set password = password('123456');
```