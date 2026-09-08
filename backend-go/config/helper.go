package config

import "os"

func required(m []string, keyword string) string {
	v := os.Getenv(keyword)
	if v == "" {
		m = append(m, keyword)
	}
	return v
}
