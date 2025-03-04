import { expect, it } from 'vitest'
import { mount } from "@vue/test-utils"
import HelloWorld from "./HelloWorld.vue"

it("should render message property", () => {
    const instance = mount(HelloWorld, {
        props: {
            msg: "My first test"
        }
    })

    expect(instance.find("h1").text()).toContain("My first test")
})

it("should render increase counter when button is clicked", async () => {
    const instance = mount(HelloWorld)

    const button = instance.find("button")
    await button.trigger("click")

    expect(instance.find("button").text()).toContain("count is 1")
})
