import { expect, it } from 'vitest'
import { mount } from "@vue/test-utils"
import TodoListComponent from "./TodoListComponent.vue"

it("should render default list items", () => {
    const instance = mount(TodoListComponent)

    const listItems = instance.findAll("li")
    expect(listItems.length).toBe(2)
    expect(listItems[0].text()).toBe("Enis Halimi")
    expect(listItems[1].text()).toBe("Ritech Solutions")
})

it("should add a new item to the list when input is submitted and it has text", async () => {
    const instance = mount(TodoListComponent)

    const input = instance.find("input")
    await input.setValue("New Todo Item")
    const button = instance.find("button")
    await button.trigger("click")

    const listItems = instance.findAll("li")
    expect(listItems.length).toBe(3)
    expect(listItems[2].text()).toBe("New Todo Item")
})

it("should not add a new item to the list when input is submitted but it's empty", async () => {
    const instance = mount(TodoListComponent)

    const input = instance.find("input")
    await input.setValue("")
    const button = instance.find("button")
    await button.trigger("click")

    const listItems = instance.findAll("li")
    expect(listItems.length).toBe(2)
    expect(listItems[0].text()).toBe("Enis Halimi")
    expect(listItems[1].text()).toBe("Ritech Solutions")
})
