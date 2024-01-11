
declare namespace NodeJS {
    interface ProcessEnv {
        readonly MODE: 'development' | 'production';
        readonly DB: import("../repository/types").DBName;
    }
}