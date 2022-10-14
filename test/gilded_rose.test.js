const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("The Quality of an item is never negative", () => {
    const gildedRose = new Shop([new Item("foo", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(0);
  });

  it("each day quality and sellin should reduced by 1 each day", function() {
    const gildedRose = new Shop([new Item("foo", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(0);
  });

  it("Once the sell by date has passed, Quality degrades twice as fast", function() {
    const gildedRose = new Shop([new Item("foo", 0, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });

  it("'Aged Brie' actually increases in Quality the older it gets", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
    expect(items[0].sellIn).toBe(0);
  });

  it("The Quality of an item is never more than 50", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(0);
  });

  it("'Sulfuras', being a legendary item, never has to be sold or decreases in Quality", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
    expect(items[0].sellIn).toBe(1);
  });

  it("'Backstage passes to a TAFKAL80ETC concert', quality drops to 0 after the concert", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });

  it("'Backstage passes to a TAFKAL80ETC concert', quality increases by 2 when there are 10 days or less", function() {
    const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0),
        new Item("Backstage passes to a TAFKAL80ETC concert", 6, 0)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
    expect(items[0].sellIn).toBe(9);
    expect(items[1].quality).toBe(2);
    expect(items[1].sellIn).toBe(5);
  });

  it("'Backstage passes to a TAFKAL80ETC concert', quality increases by 3 when there are 5 days or less", function() {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
    expect(items[0].sellIn).toBe(4);
  });
});

