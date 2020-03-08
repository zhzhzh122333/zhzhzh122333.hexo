---
title: Java处理文件
date: 2016-06-24 16:04:06
categories: [Java]
tags: [Java,file]
---

## Java简单处理文件操作

``` java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class FileUnit {
    public static String CHARSET = "UTF-8";

    public static void operate(String filePath) {
        BufferedReader br = null;
        BufferedWriter bw = null;
        try {
            File inFile = new File(filePath);
            if (inFile.exists()) {
                //读写文件
                String outFile = inFile.getParent() + "\\copy_" + inFile.getName();
                br = new BufferedReader(new InputStreamReader(new FileInputStream(inFile), CHARSET));
                bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(outFile), CHARSET));

                String line;
                while ((line = br.readLine()) != null) {
                    // TODO 填入要处理的操作
                    bw.write(line);
                    bw.newLine();
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (br != null) {
                    br.close();
                }
                if (bw != null) {
                    bw.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```