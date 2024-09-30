
declare namespace NodeJS {
    interface ProcessEnv {
        readonly MODE: 'development' | 'production';
        readonly DB: import("@/shared/helpers/repository/types").DBName;
    }
}