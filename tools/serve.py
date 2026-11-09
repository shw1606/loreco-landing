"""미리보기 서버: python3 serve.py <포트> <폴더>  — 브라우저 캐시를 막는 헤더를 붙인다(수정이 바로 보이게)."""
import sys, functools, http.server
class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, max-age=0")
        self.send_header("Pragma", "no-cache")
        super().end_headers()
    def send_head(self):  # If-Modified-Since로 304를 주지 않게 한다
        self.headers.replace_header("If-Modified-Since", "") if "If-Modified-Since" in self.headers else None
        return super().send_head()
port, root = int(sys.argv[1]), sys.argv[2]
http.server.ThreadingHTTPServer(("127.0.0.1", port), functools.partial(NoCache, directory=root)).serve_forever()
