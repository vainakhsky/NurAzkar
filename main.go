package main

import (
 "encoding/json"
 "html/template"
 "log"
 "net/http"
 "os"
)

var templates = template.Must(template.ParseGlob("templates/*.html"))

type Azkar struct {
 ID            string json:"id"
 Title         string json:"title"
 Arabic        string json:"arabic"
 Transcription string json:"transcription"
 Translation   string json:"translation"
 Repeat        int    json:"repeat"
 Source        string json:"source"
}
func loadAzkar(path string) []Azkar {
 data, err := os.ReadFile(path)
 if err != nil {
  log.Println(err)
  return []Azkar{}
 }

 var azkar []Azkar
 json.Unmarshal(data, &azkar)
 return azkar
}

func main() {
 http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

 http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
  templates.ExecuteTemplate(w, "index.html", nil)
 })

 http.HandleFunc("/morning", func(w http.ResponseWriter, r *http.Request) {
  azkar := loadAzkar("data/morning.json")
  templates.ExecuteTemplate(w, "azkar.html", azkar)
 })

 http.HandleFunc("/evening", func(w http.ResponseWriter, r *http.Request) {
  azkar := loadAzkar("data/evening.json")
  templates.ExecuteTemplate(w, "azkar.html", azkar)
 })

 port := os.Getenv("PORT")
 if port == "" {
  port = "8080"
 }

 log.Fatal(http.ListenAndServe(":"+port, nil))
}
