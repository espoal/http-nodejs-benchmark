package main

// Check: https://dev.to/douglasmakey/understanding-unix-domain-sockets-in-golang-32n8

import (
	"fmt"
	"net"
	"net/http"
)

func handlerFactory(d net.Conn) func(w http.ResponseWriter, r *http.Request) {
	buff := make([]byte, 4096)
	return func(w http.ResponseWriter, req *http.Request) {
		_, err := d.Write([]byte("{}"))
		if err != nil {
			println("error writing to unix socket: ", err)
		}

		n, err := d.Read(buff)

		_, err = fmt.Fprintf(w, string(buff[0:n]))
		if err != nil {
			println("error writing to http writer: ", err)
		}
	}
}

func main() {

	d, err := net.Dial("unix", "/tmp/channel.sock")
	if err != nil {
		println("unix socket error: ", err)
		return
	}

	h := handlerFactory(d)

	http.HandleFunc("/", h)

	err = http.ListenAndServe(":8090", nil)
	if err != nil {
		println("Listen and serve error: ", err)
		return
	}
}
