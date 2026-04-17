package main

import (
 "encoding/json"
 "html/template"
 "log"
 "net/http"
 "os"
)

type Azkar struct {
 ID            string json:"id"
 Title         string json:"title"
 Arabic        string json:"arabic"
 Transcription string json:"transcription"
 Translation   string json:"translation"
 Repeat        int    json:"repeat"
 Source        string json:"source"
}

var templates = template.Must(template.ParseGlob("templates/*.html"))

func loadAzkar(path string) []Azkar {
 data, err := os.ReadFile(path)
 if err != nil {
  log.Println("read error:", path, err)
  return []Azkar{}
 }

 var azkar []Azkar
 if err := json.Unmarshal(data, &azkar); err != nil {
  log.Println("json error:", path, err)
  return []Azkar{}
 }

 return azkar
}

func main() {
 http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

 http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
  if err := templates.ExecuteTemplate(w, "index.html", nil); err != nil {
   http.Error(w, err.Error(), http.StatusInternalServerError)
  }
 })

 http.HandleFunc("/morning", func(w http.ResponseWriter, r *http.Request) {
  azkar := loadAzkar("data/morning.json")
  if err := templates.ExecuteTemplate(w, "azkar.html", azkar); err != nil {
   http.Error(w, err.Error(), http.StatusInternalServerError)
  }
 })

 http.HandleFunc("/evening", func(w http.ResponseWriter, r *http.Request) {
  azkar := loadAzkar("data/evening.json")
  if err := templates.ExecuteTemplate(w, "azkar.html", azkar); err != nil {
   http.Error(w, err.Error(), http.StatusInternalServerError)
  }
 })

 port := os.Getenv("PORT")
 if port == "" {
  port = "8080"
 }

 log.Println("server started on :" + port)
 log.Fatal(http.ListenAndServe(":"+port, nil))
}
