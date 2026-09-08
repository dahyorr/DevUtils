package config

import (
	"os"
	"strings"
	"testing"
)

// envKeys is every variable Load consults. clearEnv wipes all of them so a
// developer's own shell (which may already export DATABASE_URL, etc.) can't
// make the "missing var" cases pass by accident.
var envKeys = []string{"PORT", "DATABASE_URL", "S3_UPLOAD_BUCKET", "S3_REGION", "WORKER_URL"}

// clearEnv unsets every key Load reads and restores the originals when the
// test (and its subtests) finish.
func clearEnv(t *testing.T) {
	t.Helper()

	saved := make(map[string]string)
	for _, k := range envKeys {
		if v, ok := os.LookupEnv(k); ok {
			saved[k] = v
		}
		os.Unsetenv(k)
	}

	t.Cleanup(func() {
		for _, k := range envKeys {
			if v, ok := saved[k]; ok {
				os.Setenv(k, v)
			} else {
				os.Unsetenv(k)
			}
		}
	})
}

// validEnv is the full set of required vars, used as the baseline each case
// then modifies.
func validEnv() map[string]string {
	return map[string]string{
		"DATABASE_URL":     "postgres://localhost:5432/devutils_test",
		"S3_UPLOAD_BUCKET": "devutils-uploads",
		"S3_REGION":        "us-east-1",
		"WORKER_URL":       "http://worker:8000",
	}
}

func TestLoad(t *testing.T) {
	tests := []struct {
		name string
		// env is applied on top of a cleared environment for this case.
		env map[string]string
		// wantErrContains: if non-empty, Load must return an error whose
		// message contains every listed substring.
		wantErrContains []string
		// check runs only when no error is expected.
		check func(t *testing.T, c Config)
	}{
		{
			name: "all required vars present, PORT defaulted",
			env:  validEnv(),
			check: func(t *testing.T, c Config) {
				want := validEnv()
				if c.DatabaseURL != want["DATABASE_URL"] {
					t.Errorf("DatabaseURL = %q, want %q", c.DatabaseURL, want["DATABASE_URL"])
				}
				if c.S3Bucket != want["S3_UPLOAD_BUCKET"] {
					t.Errorf("S3Bucket = %q, want %q", c.S3Bucket, want["S3_UPLOAD_BUCKET"])
				}
				if c.S3Region != want["S3_REGION"] {
					t.Errorf("S3Region = %q, want %q", c.S3Region, want["S3_REGION"])
				}
				if c.WorkerURL != want["WORKER_URL"] {
					t.Errorf("WorkerURL = %q, want %q", c.WorkerURL, want["WORKER_URL"])
				}
				if c.Port != "5000" {
					t.Errorf("Port = %q, want default %q", c.Port, "5000")
				}
			},
		},
		{
			name: "PORT override is respected",
			env:  merge(validEnv(), map[string]string{"PORT": "8080"}),
			check: func(t *testing.T, c Config) {
				if c.Port != "8080" {
					t.Errorf("Port = %q, want %q", c.Port, "8080")
				}
			},
		},
		{
			name:            "one required var missing",
			env:             without(validEnv(), "WORKER_URL"),
			wantErrContains: []string{"WORKER_URL"},
		},
		{
			name:            "several required vars missing",
			env:             without(validEnv(), "S3_REGION", "WORKER_URL"),
			wantErrContains: []string{"S3_REGION", "WORKER_URL"},
		},
		{
			name:            "all required vars missing",
			env:             nil,
			wantErrContains: []string{"DATABASE_URL", "S3_UPLOAD_BUCKET", "S3_REGION", "WORKER_URL"},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			clearEnv(t)
			for k, v := range tt.env {
				t.Setenv(k, v) // auto-restored when this subtest ends
			}

			c, err := Load()

			if len(tt.wantErrContains) > 0 {
				if err == nil {
					t.Fatalf("Load() error = nil, want error mentioning %v", tt.wantErrContains)
				}
				for _, sub := range tt.wantErrContains {
					if !strings.Contains(err.Error(), sub) {
						t.Errorf("error %q does not mention %q", err.Error(), sub)
					}
				}
				return
			}

			if err != nil {
				t.Fatalf("Load() unexpected error: %v", err)
			}
			if tt.check != nil {
				tt.check(t, c)
			}
		})
	}
}

// without returns a copy of m with keys removed.
func without(m map[string]string, keys ...string) map[string]string {
	out := make(map[string]string, len(m))
	for k, v := range m {
		out[k] = v
	}
	for _, k := range keys {
		delete(out, k)
	}
	return out
}

// merge returns base with extra's entries layered on top.
func merge(base, extra map[string]string) map[string]string {
	out := make(map[string]string, len(base)+len(extra))
	for k, v := range base {
		out[k] = v
	}
	for k, v := range extra {
		out[k] = v
	}
	return out
}
