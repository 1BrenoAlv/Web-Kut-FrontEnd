<template>
  <div>
    <label :for="valueFor" class="block mb-2 text-sm font-medium"> {{valueLabel}}</label>
    <input
      :type="valueType"
      :id="valueId"
      :name="valueFor"
      :value="modelValue"
      @input="updateValue"
      class="w-full px-3 py-2 text-white bg-[#2d2e5a] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6560EA]"
      :placeholder="valuePlaceholder"
      required
    />
  </div>
</template>

<script>
export default {
  name: 'InputForm',
  props: ['valueFor', 'valueType', 'valueId', 'valuePlaceholder', 'valueLabel', 'modelValue'],
  
  emits: ['update:modelValue'],
  
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>