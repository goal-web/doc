# Package vector



## Types

### type Document

Document represents a chunk of text to be indexed.


### type SimpleStore

SimpleStore is a simple in-memory vector store that can be saved to JSON.
It uses brute-force cosine similarity for search, which is fast enough for <10k docs.


#### func (SimpleStore) Add



#### func (SimpleStore) Load



#### func (SimpleStore) Save



#### func (SimpleStore) Search



### type Store

Store defines the interface for a vector database.


