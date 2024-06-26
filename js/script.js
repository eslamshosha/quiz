let hint = document.querySelector(".preloader");
window.onload = function () {
  //hide the preloader
  setTimeout(function () {
    hint.style.display = "none";
  }, 700);
};
$(document).ready(function () {
  ///////// ** related** /////////
  var specials = new Swiper(".related-slider .swiper-container", {
    // loop: true,
    autoplay: true,
    slidesPerView: 3.2,
    spaceBetween: 20,
    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 15,
      },
      767: {
        slidesPerView: 2.2,
        spaceBetween: 15,
      },
      992: {
        slidesPerView: 2.2,
        spaceBetween: 15,
      },
      1199: {
        slidesPerView: 3.2,
        spaceBetween: 30,
      },
    },
  });
});

// -----wheel-spin-js------
var padding = { top: 0, right: 0, bottom: 0, left: 0 },
  w = 400 - padding.left - padding.right,
  h = 400 - padding.top - padding.bottom,
  r = Math.min(w, h) / 2,
  rotation = 0,
  oldrotation = 0,
  picked = 100000,
  oldpick = [],
  color = d3.scale.category20(); //category20c()
//randomNumbers = getRandomNumbers();

var data = [
  { label: "eslam", value: 1, xp: "eslam" },
  { label: "nader", value: 1, xp: "nader" },
  { label: "ahmed", value: 1, xp: "ahmed" },
  { label: "abdo", value: 1, xp: "abdo" },
  { label: "abdo", value: 1, xp: "abdo" },
  { label: "abdo", value: 1, xp: "abdo" },
  { label: "0x", value: 1, xp: "you Lost 0x" },
  { label: "2x", value: 1, xp: "you Win 2x" },
];
var svg = d3
  .select("#spinwheel")
  .append("svg")
  .data([data])
  .attr("xmlns", "http://www.w3.org/2000/svg")
  .attr("viewBox", "0 0 " + w + " " + w + "")
  .attr("width", w)
  .attr("height", h + padding.top + padding.bottom);
var container = svg
  .append("g")
  .attr("class", "chartholder")
  .attr(
    "transform",
    "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")"
  );
var vis = container.append("g");

var pie = d3.layout
  .pie()
  .sort(null)
  .value(function (d) {
    return 1;
  });
// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);
// select paths, use arc generator to draw
var arcs = vis
  .selectAll("g.slice")
  .data(pie)
  .enter()
  .append("g")
  .attr("class", "slice")
  .style("fill", "#69b3a2");

arcs
  .append("path")
  .attr("fill", function (d, i) {
    return color(i);
  })
  .attr("d", function (d) {
    return arc(d);
  });
// add the text
arcs
  .append("text")
  .attr("transform", function (d) {
    d.innerRadius = 0;
    d.outerRadius = r;
    d.angle = (d.startAngle + d.endAngle) / 2;
    return (
      "rotate(" +
      ((d.angle * 180) / Math.PI - 90) +
      ")translate(" +
      (d.outerRadius - 60) +
      ")"
    );
  })
  .attr("font-size", "20")
  .attr("fill", "#ffffff")
  .attr("text-anchor", "end")
  .text(function (d, i) {
    return data[i].label;
  });
$("#spin").on("click", spin);
function spin(d) {
  $("#spin").on("click", null);
  //all slices have been seen, all done
  //console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
  document.getElementById("spinOverlay").style.display = "flex";
  document.getElementById("body").classList.add("overflow");
  if (oldpick.length == data.length) {
    console.log("done");
    $("#spin").on("click", null);
    return;
  }
  var ps = 360 / data.length,
    pieslice = Math.round(1440 / data.length),
    rng = Math.floor(Math.random() * 1440 + 360);

  rotation = Math.round(rng / ps) * ps;
  //console.log(rotation);

  picked = Math.round(data.length - (rotation % 360) / ps) + 2;

  picked = picked >= data.length ? picked % data.length : picked;
  if (oldpick.indexOf(picked) !== -1) {
    d3.select(this).call(spin);
    return;
  } else {
    oldpick.push(picked);
  }
  rotation += 90 - Math.round(ps / 1);
  var interval = setInterval(function () {
    $(".wheeldots").addClass("active-dots");
    setTimeout(function () {
      $(".wheeldots").removeClass("active-dots");
    }, 100);
  });
  vis
    .transition()
    .duration(3000)
    .attrTween("transform", rotTween)
    .each("end", function () {
      clearInterval(interval);
      //mark question as seen
      d3.select(".slice:nth-child(" + (picked + 1) + ") path");
      //populate question
      d3.select("#question h1").text(data[picked].question);
      oldrotation = rotation;
      console.log(data[picked].xp);
      document.getElementById("spinWinner").innerHTML = data[picked].xp;
      document.getElementById("spin-result").classList.add("active");
      // document.getElementById("spinOverlay").style.display = "flex";

      //container.on("click", spin);
    });
}
//make arrow
// svg.append("g")
//     .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
//     .append("path")
//     .attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
//     .style({"fill":"black"});
//draw spin circle
container
  .append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 30)
  .style({ fill: "#ffffff" });
//spin text
// container.append("text")
//     .attr("x", 0)
//     .attr("y", 15)
//     .attr("text-anchor", "middle")
//     .text("SPIN")
//     .style({"font-weight":"bold", "font-size":"30px"});

function rotTween(to) {
  var i = d3.interpolate(oldrotation % 360, rotation);
  return function (t) {
    return "rotate(" + i(t) + ")";
  };
}

function getRandomNumbers() {
  var array = new Uint16Array(1000);
  var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
  if (
    window.hasOwnProperty("crypto") &&
    typeof window.crypto.getRandomValues === "function"
  ) {
    window.crypto.getRandomValues(array);
    console.log("works");
  } else {
    //no support for crypto, get crappy random numbers
    for (var i = 0; i < 1000; i++) {
      array[i] = Math.floor(Math.random() * 100000) + 1;
    }
  }
  return array;
}
function closeSpin() {
  document.getElementById("spin-result").classList.remove("active");
  document.getElementById("spinOverlay").style.display = "none";
  document.getElementById("body").classList.remove("overflow");
}
