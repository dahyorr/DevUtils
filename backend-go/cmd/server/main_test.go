package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHealthz(t *testing.T) {
	// 1. Build a fake *http.Request. This does NOT hit the network — it just
	//    constructs the struct a real server would hand your handler.
	//    Args: method, target path, body (nil here since GET has no body).
	req := httptest.NewRequest(http.MethodGet, "/healthz", nil)

	// 2. httptest.NewRecorder() is a fake http.ResponseWriter that captures
	//    whatever the handler writes: status code, headers, body bytes.
	rec := httptest.NewRecorder()

	// 3. Run the request through your real router. ServeHTTP is the method
	//    every http.Handler has — this is exactly what the server calls
	//    internally per request. No port, no goroutine, fully synchronous.
	newRouter().ServeHTTP(rec, req)

	// 4. Assert on the status code. rec.Code is an int (200, 404, ...).
	if rec.Code != http.StatusOK {
		// t.Errorf logs the failure but keeps the test running.
		// t.Fatalf logs and stops this test immediately — use it when
		// continuing makes no sense (e.g. body decode below would panic).
		t.Errorf("status = %d, want %d", rec.Code, http.StatusOK)
	}

	// 5. Assert on the body. rec.Body is a *bytes.Buffer. Decode the JSON
	//    into a struct shaped like your response.
	var got struct {
		Status string `json:"status"`
	}
	if err := json.NewDecoder(rec.Body).Decode(&got); err != nil {
		t.Fatalf("decoding body: %v", err)
	}

	if got.Status != "ok" {
		t.Errorf("status field = %q, want %q", got.Status, "ok")
	}

	// 6. (Optional) check a header your writeJSON sets.
	if ct := rec.Header().Get("Content-Type"); ct != "application/json" {
		t.Errorf("Content-Type = %q, want application/json", ct)
	}
}
