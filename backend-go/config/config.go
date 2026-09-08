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
	if db, v := os.LookupEnv("DATABASE_URL"); !v {
		missing = append(missing, "DATABASE_URL")
	} else {
		c.DatabaseURL = db
	}
	if sb, v := os.LookupEnv("S3_UPLOAD_BUCKET"); !v {
		missing = append(missing, "S3_UPLOAD_BUCKET")
	} else {
		c.S3Bucket = sb
	}
	if sr, v := os.LookupEnv("S3_REGION"); !v {
		missing = append(missing, "S3_REGION")
	} else {
		c.S3Region = sr
	}
	if w, v := os.LookupEnv("WORKER_URL"); !v {
		missing = append(missing, "WORKER_URL")
	} else {
		c.WorkerURL = w
	}

	if len(missing) > 0 {
		err := fmt.Errorf("missing required env vars: %s", strings.Join(missing, ", "))
		return Config{}, err
	}

	return c, nil
}
