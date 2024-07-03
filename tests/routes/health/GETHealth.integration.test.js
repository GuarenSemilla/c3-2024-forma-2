import request from 'supertest'
import { server, app } from '../../../src/index'

/**
 * El objetivo de este test de integración es probar
 * el endpoint para evaluar si la aplicación responde
 */
describe('GET /health', () => {
    afterAll(() => {
        server.close()
    })

    test('should respond ok message', async () => {
        const response = await request(app.callback()).get('/health')
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: 'ok' })
    })
})

describe('consulta GET /api/history/:ocurrence', () => {
    test('Debería devolver un arreglo con los eventos históricos que hayan resultado de la búsqueda ordenados desde el más antiguo al más nuevo, en donde "date" siempre es <= 0', async () => {
        const response = await request(app.callback()).get('/api/history/ac')
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
    })
    
    test('Debería devolver un arreglo con los eventos históricos que hayan resultado de la búsqueda ordenados desde el más antiguo al más nuevo, en donde "date" siempre es > 0', async () => {
        const response = await request(app.callback()).get('/api/history/dc')
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
    })
    test('Debería devolver el mensaje "Solo se aceptan caracteres no numéricos" al ingresar un número con letras', async () => {
        const response = await request(app.callback()).get('/api/history/ad')
        expect(response.body).toEqual({ message: "El input debe ser ac o dc" })
        expect(response.status).toBe(400)
    })
    test('Debería devolver el mensaje "Solo se aceptan caracteres no numéricos" al ingresar un número', async () => {
        const response = await request(app.callback()).get('/api/history/a4')
        expect(response.body).toEqual({ message: 'Solo se aceptan caracteres no numéricos' })
        expect(response.status).toBe(400)
    })
    test('Debería devolver el mensaje "Solo se aceptan caracteres no numéricos" al ingresar un número con letras', async () => {
        const response = await request(app.callback()).get('/api/history/25')
        expect(response.body).toEqual({ message: 'Solo se aceptan caracteres no numéricos' })
        expect(response.status).toBe(400)
    })
    test('Debería devolver el mensaje "El input debe ser ac o dc" y el largo sea != 2', async () => {
        const response = await request(app.callback()).get('/api/history/ac1')
        expect(response.body).toEqual({ message: "El input debe ser == 2" })
        expect(response.status).toBe(400)
    })

})