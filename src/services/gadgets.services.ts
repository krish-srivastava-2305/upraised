import { PrismaClient } from "../generated/prisma"

const prisma = new PrismaClient()

interface gadget {
    name: string
}

const create = async (data: gadget) => {
    if (!data || !data.name) {
        throw new Error("Invalid data: 'name' is required")
    }
    const gadget = await prisma.gadget.create({
        data: {
            name: data.name
        }
    })
    return gadget
}

const getGadgets = async () => {
    const gadgets = await prisma.gadget.findMany()
    return gadgets
}

const updateName = async (id: string, data: gadget) => {
    const gadget = await prisma.gadget.update({
        where: { id },
        data: {
            name: data.name,
            updatedAt: new Date()
        }
    })
    return gadget
}

const updateStatus = async (id: string) => {
    const gadget = await prisma.gadget.update({
        where: { id },
        data: {
            status: "DECOMMISSIONED"
        }
    })
    return gadget
}

const destructor = async (id: string, otp: string) => {
    const gadget = await prisma.gadget.update({
        where: { id, destructOtp: otp },
        data: {
            status: "DESTROYED"
        }
    })
    return gadget
}

export { create, getGadgets, updateName, updateStatus, destructor }