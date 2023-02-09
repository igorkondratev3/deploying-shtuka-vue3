import { defineStore } from 'pinia';

export const additionalsCollection = defineStore({
  id: 'additionalsCollection',
  state: () => ({
    circle1: {
      grade7: {},
      grade8: {},
      grade9: {},
    },
    circle2: {
      grade9: {},
      grade10: {},
      grade11: {},
    },
  }),
  actions: {
    setAdditionals(additionals) {
      this[`circle${additionals[0].circle}`][`grade${additionals[0].grade}`][
        `lesson${additionals[0].lesson}`
      ] = additionals;
    },
    setAdditional(additional) {
      if (additional) {
        const additionals =
          this[`circle${additional.circle}`][`grade${additional.grade}`][
            `lesson${additional.lesson}`
          ];
        if (additionals) additionals.push(additional);
        else
          this[`circle${additional.circle}`][`grade${additional.grade}`][
            `lesson${additional.lesson}`
          ] = [additional];
      }
    },
    deleteAdditional(additional) {
      const additionals =
        this[`circle${additional.circle}`][`grade${additional.grade}`][
          `lesson${additional.lesson}`
        ];
      additionals.splice(
        additionals.findIndex((add) => add._id == additional._id),
        1
      );
    },
    editAdditional(currentAdditional) {
      const additionals =
        this[`circle${currentAdditional.circle}`][
          `grade${currentAdditional.grade}`
        ][`lesson${currentAdditional.lesson}`];
      const additional = additionals.find(
        (additional) => additional._id === currentAdditional._id
      );
      additional.address = currentAdditional.address;
      additional.name = currentAdditional.name;
      additional.description = currentAdditional.description;
    },
    clearAdditionals() {
      this.circle1.grade7 = {};
      this.circle1.grade8 = {};
      this.circle1.grade9 = {};
      this.circle2.grade9 = {};
      this.circle2.grade10 = {};
      this.circle2.grade11 = {};
    },
  },
});
