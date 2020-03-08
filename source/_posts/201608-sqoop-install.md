---
title: CentOS下安装Sqoop
date: 2016-08-31 17:30:00
categories: [Linux]
tags: [Linux,sqoop]
---

>系统：CentOS 6.5桌面版
>版本：Sqoop 1.4.6

## 下载并解压
下载[Sqoop](http://sqoop.apache.org/)，这里下载的版本是sqoop-1.4.6.bin__hadoop-2.0.4-alpha.tar.gz
```
tar zxvf sqoop-1.4.6.bin__hadoop-2.0.4-alpha.tar.gz
mv sqoop-1.4.6.bin__hadoop-2.0.4-alpha /env/
cd /env
ln -s sqoop-1.4.6.bin__hadoop-2.0.4-alpha sqoop
```

<!-- more -->

## 配置环境变量
编辑/etc/profile，加入sqoop的环境变量
``` sh
export SQOOP_HOME=/env/sqoop
export PATH=$SQOOP_HOME/bin:$PATH
```

## 编辑配置文件
编辑sqoop目录下的配置文件
```
cd /env/sqoop/conf
cp sqoop-env-template.sh sqoop-env.sh
vim sqoop-env.sh
```
加入相应的目录，注意hadoop-common和hadoop-mapred都是填hadoop的安装目录
``` sh
export HADOOP_COMMON_HOME=/env/hadoop
export HADOOP_MAPRED_HOME=/env/hadoop
export HBASE_HOME=/env/hbase
export HIVE_HOME=/env/hive
```

## 添加数据库驱动
根据你的数据库，下载相应的驱动jar包放入sqoop/lib目录下，这里用的是[sqlserver](https://www.microsoft.com/zh-cn/download/details.aspx?id=21599)
附上下载连接[sqlserver](https://download.microsoft.com/download/3/D/4/3D4DBEAB-B3D2-41DF-87BC-0FCA33CAAB5C/2052/sqljdbc_3.0.1301.101_chs.tar.gz)
```
tar zxvf sqljdbc_3.0.1301.101_chs.tar.gz
cp sqljdbc_3.0/chs/sqljdbc4.jar /env/sqoop/lib
```

## 测试
查看数据库
```
sqoop list-databases --connect 'jdbc:sqlserver://xxx.xxx.xxx.xxx:xxx' --username 'xxx' --password 'xxx'
```

## 从数据库导入到hdfs
```
sqoop import --connect 'jdbc:sqlserver://xxx.xxx.xxx.xxx:xxx;database=xxx' --username 'xxx' --password 'xxx' --query 'select xxxxx WHERE $CONDITIONS' --hive-import --hive-table {hive表} --hive-overwrite --target-dir /xxx/xxx --split-by {主键}
```


