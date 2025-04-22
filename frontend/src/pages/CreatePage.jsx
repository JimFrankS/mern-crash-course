import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProductStore } from '../store/product'; // Importing the useProductStore hook



const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });
    const toast = useToast() //toast for notifications
    const {createProduct} = useProductStore()

    const handleAddProduct = async () => {
     const {success, message} = await createProduct(newProduct) //create product function from the store
     if(!success){ //if product is not created successfully show error message for 5 seconds, which is closable
        toast({
            title: "Error",
            description: message,
            status: "error",
            duration: 5000,
            isClosable: true, //makes the toast closable
        });
     }
     else{ //if product is created successfully show success message for 5 seconds, which is closable
        toast({
            title: "Success",
            description: message,
            status: "success",
            duration: 5000,
            isClosable: true, //makes the toast closable
        });
     }
    setNewProduct({ name: "", price: "", image: "" }); //reset the form after submission
    } 

  return (
    <Container maxW={"container.sm"}>
        <VStack
        spacing={8}> {/*vertical stack for spacing between elements*/}
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}> {/*heading for the page*/}
            Create New Product
        </Heading>

        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} 
        p={6} rounded={"lg"} shadow={"md"}> {/*box for the form*/}
            <VStack spacing={4} alignItems={"flex-start"}> {/*vertical stack for spacing between elements*/}
                <Input  
                placeholder='Product Name' //placeholder for the input field
                name='name' //name of the input field
                value={newProduct.name} //value of the input field
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} //set the value of the input field
                />

                <Input 
                placeholder='Product Price' //placeholder for the product input field
                name='price' //name of the input field
                type='number' //type of the input field
                min={1} //minimum value for the input field
                value={newProduct.price} //value of the input field
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} //set the value of the input field
                />

                <Input 
                placeholder='Product Image URL' //placeholder for the image input field
                name='image' //name of the input field
                value={newProduct.image} //value of the input field
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} //set the value of the input field
                />
                <Button colorScheme={"blue"} onClick={handleAddProduct} w={"full"} >
                    Add Product
                </Button>
            </VStack>

        </Box>
        </VStack>

    </Container>
  )
}

export default CreatePage