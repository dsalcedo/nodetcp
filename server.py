import socket
import threading

bind_ip = '0.0.0.0'
bind_port = 8181

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((bind_ip, bind_port))
server.listen(100)  # max backlog of connections

print 'Listening on {}:{}'.format(bind_ip, bind_port)
