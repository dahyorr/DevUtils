// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri_plugin_sql::{Migration, MigrationKind};

fn main() {
    let migrations = vec![
        // Define your migrations here
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "CREATE TABLE hashes (id INTEGER PRIMARY KEY, filename TEXT, type TEXT, hash TEXT, status TEXT, request_id TEXT);",
            kind: MigrationKind::Up,
        }
    ];

    tauri::Builder::default().plugin(
        tauri_plugin_sql::Builder::default()
            .add_migrations("sqlite:db.db", migrations)
            .build(),
    );

    app_lib::run();
}
