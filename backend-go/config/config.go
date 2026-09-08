package config

import (
	"fmt"
	"os"
	"strings"
)

type Config struct {
	Port        string
	DatabaseURL string
	S3Bucket    string
	S3Region    string
	WorkerURL   string
}

func Load() (Config, error) {
	var missing []string
	var c Config

	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}
	c.Port = port
	c.DatabaseURL = requiredEnvVariable(&missing, "DATABASE_URL")
	c.S3Bucket = requiredEnvVariable(&missing, "S3_UPLOAD_BUCKET")
	c.S3Region = requiredEnvVariable(&missing, "S3_REGION")
	c.WorkerURL = requiredEnvVariable(&missing, "WORKER_URL")

	if len(missing) > 0 {
		err := fmt.Errorf("missing required env vars: %s", strings.Join(missing, ", "))
		return Config{}, err
	}

	return c, nil
}
