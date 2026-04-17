package main

import (
    "encoding/json"
    "html/template"
    "log"
    "net/http"
    "os"
    "path/filepath"
)

type Azkar struct {
    ID            string `json:"id"`
    Title         string `json:"title"`
    Arabic        string `json:"arabic"`
    Transcription string `json:"transcription"`
    Translation   string `json:"translation"`
    Repeat        int    `json:"repeat"`
    Source        string `json:"source"`
}

type PageData struct {
    AppName string
}

var templates = template.Must(template.ParseGlob("templates/*.html"))

func main() {
    mux := http.NewServeMux()

    mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
    mux.HandleFunc("/", indexHandler)
    mux.HandleFunc("/api/morning", azkarHandler("data/morning.json"))
    mux.HandleFunc("/api/evening", azkarHandler("data/evening.json"))
    mux.HandleFunc("/manifest.webmanifest", serveStaticFile("static/manifest.webmanifest", "application/manifest+json"))
    mux.HandleFunc("/service-worker.js", serveStaticFile("static/service-worker.js", "application/javascript"))

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }
    addr := ":" + port

    log.Printf("NurAzkar running on http://localhost%s", addr)
    if err := http.ListenAndServe(addr, loggingMiddleware(mux)); err != nil {
        log.Fatal(err)
    }
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
    if r.URL.Path != "/" {
        http.NotFound(w, r)
        return
    }
    _ = templates.ExecuteTemplate(w, "index.html", PageData{AppName: "NurAzkar"})
}

func azkarHandler(path string) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        items, err := loadAzkar(path)
        if err != nil {
            http.Error(w, "failed to load azkar", http.StatusInternalServerError)
            return
        }
        w.Header().Set("Content-Type", "application/json; charset=utf-8")
        _ = json.NewEncoder(w).Encode(items)
    }
}

func loadAzkar(path string) ([]Azkar, error) {
    b, err := os.ReadFile(filepath.Clean(path))
    if err != nil {
        return nil, err
    }
    var items []Azkar
    if err := json.Unmarshal(b, &items); err != nil {
        return nil, err
    }
    return items, nil
}

func serveStaticFile(path string, contentType string) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        b, err := os.ReadFile(filepath.Clean(path))
        if err != nil {
            http.NotFound(w, r)
            return
        }
        w.Header().Set("Content-Type", contentType)
        _, _ = w.Write(b)
    }
}

func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("%s %s", r.Method, r.URL.Path)
        next.ServeHTTP(w, r)
    })
}
