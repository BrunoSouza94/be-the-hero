import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import logo from '../../assets/logo.png';

import styles from './styles';
import api from '../../services/api';

export default function Casos(){
    const navigation = useNavigation();
    const [casos, setCasos] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateToDetail(caso){
        navigation.navigate('Detalhes', {
            caso
        });
    }

    async function loadCasos(){
        if(loading){
            return;
        }
        if(total > 0 && casos.length === total){
            return;
        }

        setLoading(true);

        const response = await api.get(`casos?page=${page}`);

        setCasos([...casos, ...response.data]);
        setTotal(response.headers['x-total-count'])
        setPage(page + 1);
        setLoading(false);
        
    }

    useEffect(() => {
        loadCasos();
    }, []);
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.textBold}>{total} casos.</Text>
                </Text>
            </View>
        

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um caso and Be The Hero!</Text>

            <FlatList style={styles.casosList} 
                      data={casos} 
                      keyExtractor={caso => String(caso.id)}
                      showsVerticalScrollIndicator={false}
                      onEndReached={loadCasos}
                      onEndReachedThreshold={.2}
                      renderItem={({ item: caso }) => (
                <View style={styles.caso}>
                    <Text style={styles.casoProperty}>ONG:</Text>
                    <Text style={styles.casoValor}>{caso.nome}</Text>

                    <Text style={styles.casoProperty}>Caso:</Text>
                    <Text style={styles.casoValor}>{caso.titulo}</Text>

                    <Text style={styles.casoProperty}>Valor:</Text>
                    <Text style={styles.casoValor}>
                        {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(caso.valor)}
                    </Text>

                    <TouchableOpacity style={styles.detailButton} onPress={(() => navigateToDetail(caso))}>
                        <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color='#E02041'/>
                    </TouchableOpacity>
                </View>
            )} />
        </View>
    )
}