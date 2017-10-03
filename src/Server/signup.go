package main

import (
	"net/http"
	"encoding/json"
	"fmt"
)

type RegistrationInfo struct {
	FirstName string
	LastName  string
	Username  string
	Password  string
	Email     string
	Ufid      string
}

func signupHandler(w http.ResponseWriter, r *http.Request) {
	file := readBytes(r)
	var t RegistrationInfo
	json.Unmarshal(file, &t)

	fmt.Printf("SIGNUP:\nFirst Name: %v\n,Last Name: %v\nUsername: %v\nPassword: %v\nEmail: %v\nUFID: %v\n",
		t.FirstName, t.LastName, t.Username, t.Password, t.Email, t.Ufid)

	fmt.Fprintf(w, "You reached /%s", r.URL.Path[1:])
}