# Package hash



## Types

### type Digest128

Digest128 represents a partial evaluation of a 128 bites hash.


#### func (Digest128) Sum128

sum128 computers two 64-bit hash value. It is assumed that
bmix was first called on the data to process complete blocks
of 16 bytes. The 'tail' is a slice representing the 'tail' (leftover
elements, fewer than 16). If pad_tail is true, we make it seem like
there is an extra element with value 1 appended to the tail.
The length parameter represents the full length of the data (including
the blocks of 16 bytes, and, if pad_tail is true, an extra byte).


#### func (Digest128) Sum256

sum256 will compute 4 64-bit hash values from the input.
It is designed to never allocate memory on the heap. So it
works without any byte buffer whatsoever.
It is designed to be strictly equivalent to

				a1 := []byte{1}
	         hasher := murmur3.New128()
	         hasher.Write(data) // #nosec
	         v1, v2 := hasher.Sum128()
	         hasher.Write(a1) // #nosec
	         v3, v4 := hasher.Sum128()

See TestHashRandom.


