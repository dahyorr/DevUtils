package config

import (
	"os"
)

func requiredEnvVariable(errSlice *[]string, keyword string) string {
	v := os.Getenv(keyword)
	if v == "" {
		*errSlice = append(*errSlice, keyword)
	}
	return v
}
