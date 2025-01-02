what is RPC : 

Remote procedure call is a way for one program to call a function that gets executed on another program 

The call function might execute different process on the same machine or 
                                                  on the different machine reachable via the network




caller                                 -                               server

                                         procedure call
invoke procedure ====================>    receive procedure 
                                                                                     Execute procedure 
                 cilent    <====================   Send result 
                                   result of procedure execution





gRPC is a modern high performance cloud native RPC framework 

platform independent

language independent

open source

Google has an internal RPC framework called stubby  . 

Google decides to release next version of stubby that will be open source called gRPC 




It relies on HTTP/2 distribution protocol , ProtoBuffer message format  , this results the communication b\t services with high performance 



-----------------------


HTTP/2

this performance gains through three major things 
1 ) req and res are transmitted in binary format .
2 ) different req and res msg can be multiplexity on a single connection 
3 ) Headers are compressed by default uisng hpack


protobuf => serialized structured data => similar to xml , json but its faster , smaller and simpler

                      transmitted
req and res  ==========> Binary format