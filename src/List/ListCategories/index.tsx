import React, { useState } from 'react';
import { Alert, Button, FlatList, Modal, Pressable } from 'react-native';
import { HeaderScreen } from '../../components/HeaderScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { keyCategory } from '../../utils/keyStorage';

import {
    Container,
    Header,
    Title,
    ButtonBack,
    Icon,
    ListCategoryTotal,
    CategoryName,
    DeleteButton,
    IconDelete,
} from './styles';
import EditCategory from '../../Screens/Categories/edit';

export interface ListCategoriesProps {
    id: string;
    name: string;
}

interface Props {
    listCategory: ListCategoriesProps[];
    setListCategory: (listCategories: ListCategoriesProps[]) => void;
    closeListCategory: () => void;
}

export function ListCategories({ listCategory, setListCategory, closeListCategory }: Props) {
    const [cat, setCat] = useState<ListCategoriesProps>({id:'',name:''})
    const [isModalEdit, setIsModalEdit] = useState(false)

    function handleModalEdit(category: ListCategoriesProps) {
        setIsModalEdit(!isModalEdit)
        setCat(category)
    }

    function handleDeleteCategory(id: string, name: string) {
        Alert.alert(
            "Alerta de Exclusão",
            "Tem certeza que deseja excluir "+name+" ?",
            [
                {
                    text: "Não",
                    onPress: () => {},
                    style: "cancel"
                },
                {
                    text: "Sim",
                    onPress: () => {
                        deleteItem(id);
                    }
                }
            ]
        );
    }

    async function deleteItem(id: string) {
        try {
            const response = await AsyncStorage.getItem(keyCategory);
            const newCategoryData: ListCategoriesProps[] = response ? JSON.parse(response) : [];
            let categoryArray: ListCategoriesProps[] = newCategoryData.filter(item => item.id !== id);
            await AsyncStorage.removeItem(keyCategory);
            await AsyncStorage.setItem(keyCategory, JSON.stringify(categoryArray));
            setListCategory(categoryArray);
            return true;
        }
        catch(exception) {
            return false;
        }
    }

    function closeEditCategory() {
        setIsModalEdit(false);
    }

    return (
        <Container>
            <HeaderScreen />
            <Header>
                <Title>Lista de Categorias:</Title>
                <ButtonBack onPress={closeListCategory}>
                    <Icon name='corner-up-left' size={25} />
                </ButtonBack>
            </Header>

            <FlatList
                data={listCategory}
                style={{ flex: 1, width: '100%' }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ListCategoryTotal>
                        <Pressable onPress={() => handleModalEdit(item)}>
                            <CategoryName>{item.name}</CategoryName>
                        </Pressable>
                        <DeleteButton onPress={() => handleDeleteCategory(item.id, item. name)}>
                            <IconDelete name="trash-2" size={20}/>
                        </DeleteButton>
                    </ListCategoryTotal>
                )}
            />
            <Modal visible={isModalEdit}>
                <EditCategory closeEditCategory={closeEditCategory} category={cat} />
            </Modal>
        </Container>
    )
}
