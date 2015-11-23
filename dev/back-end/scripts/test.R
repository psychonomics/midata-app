library(rmongodb)
library(RJSONIO)

adder <- function () {
  
  #o = fromJSON(jsonObj)
  
  mongo <- mongo.create()
  if (mongo.is.connected(mongo)) {
    buf <- mongo.bson.buffer.create()
    query <- mongo.bson.from.buffer(buf)
    
    cursor_transaction <- mongo.find(mongo, "testdb.transactions", query)
    transactions <- mongo.cursor.to.data.frame(cursor_transaction)
    
    cursor_bank <- mongo.find(mongo, "testdb.banks", query)
    bank <- mongo.cursor.to.data.frame(cursor_bank)
    
    # delete data
    mongo.drop(mongo, "testdb.transactions")
    mongo.drop(mongo, "testdb.banks")
    # close connection
    mongo.destroy(mongo)
    
  }
  
  values <- transactions$balance
  provider <- toString(bank$bankname)
  
  res <- c(mean(values), provider)
  
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