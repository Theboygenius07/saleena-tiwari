"""Local server that mirrors vercel.json: / is the About page, /name serves name.html,
and old /pages/name.html links redirect to /name. Sends no-cache headers."""
import http.server, os, socketserver, sys

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, max-age=0")
        super().end_headers()

    def do_GET(self):
        path, _, query = self.path.partition("?")
        if path.startswith("/pages/"):
            name = path[len("/pages/"):].removesuffix(".html")
            self.send_response(308); self.send_header("Location", "/" + name); self.end_headers(); return
        if path.endswith(".html") and path != "/":
            self.send_response(308); self.send_header("Location", path[:-5] or "/"); self.end_headers(); return
        if path == "/":
            self.path = "/about.html"
        elif "." not in os.path.basename(path) and os.path.exists("." + path + ".html"):
            self.path = path + ".html" + ("?" + query if query else "")
        super().do_GET()

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", port), Handler) as httpd:
    httpd.serve_forever()
