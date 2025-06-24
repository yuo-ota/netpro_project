package jp.ac.dendai.backend.util;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;

public class NanoIdGenerator {

    public static String generate() {
        // ServiceファイルなどからNanoIdGenerator.generate()をすることでIDを発行することが目的
        // もし独自の文字長などを作りたい場合はここに書く
        // 参考: "https://github.com/aventrix/jnanoid"
        return NanoIdUtils.randomNanoId();
    }
}
