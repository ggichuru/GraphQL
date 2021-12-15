## TYPE_DEFINITIONS

  description Application schema - defines all the operations that can be performed on the api and the custom types

    - @Scalar_Types String, Int, Float, Boolean, ID [rep unique identiers]

## RESOLVERS

- description Functions for each operation that can be perfomed on each api operation
  
- argument parent Useful while working with relational data
- argument args Contains the operation argument supplied
- argument {db} Context - useful for contextual data (logged in user id)
- argument info Contains great info about the actual operations sent along to the server
  
- note When using any argument always include all arguments
