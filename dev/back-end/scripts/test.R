library(rmongodb)
library(RJSONIO)

adder <- function () {
  
  #o = fromJSON(jsonObj)
  
  mongo <- mongo.create()
  if (mongo.is.connected(mongo)) {
    buf <- mongo.bson.buffer.create()
    query <- mongo.bson.from.buffer(buf)
    
    cursor <- mongo.find(mongo, "testdb.users", query)
    
    df <- mongo.cursor.to.data.frame(cursor)
    
    # delete data
    mongo.drop(mongo, "testdb.users")
    # close connection
    mongo.destroy(mongo)
    
  }
  
  values <- df$age
  res <- sum(values)
  
  return(toJSON(res))
}




#adder <- function () {
#
#  mongo <- mongo.create()
#  if (mongo.is.connected(mongo)) {
#  
#    buf <- mongo.bson.buffer.create()
#    query <- mongo.bson.from.buffer(buf)
#    
#    cursor <- mongo.find(mongo, "testdb.users", query)
#    
#    df <- mongo.cursor.to.data.frame(cursor)
#   
#    response <- sum(df$age)
#    #print(res)
#    return(toJSON(response))
#  }
#}