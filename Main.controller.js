sap.ui.define(
  [
    "sap/m/MessageToast",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
  ],
  function (MessageToast, Controller, JSONModel) {
    "use strict";
    var ACCOUNT = "SampleDevAccess";
    var MainController = Controller.extend("sjsu.TwitterAPI.Main", {
      onInit: function () {
        $.ajax({
          type: "GET",
          contentType: "application/json",
          url: "/api",
          dataType: "json",
          success: function (data) {
            ACCOUNT = data.account ? data.account : "SampleDevAccess";
          },
          error: function (error) {
            console.log("Error during init");
          },
        });
        var oModel = new JSONModel({
          results: { statuses: [] },
          busy: false,
          delete: [{ action: ACCOUNT }],
        });
        this.getView().setModel(oModel, "mainModel");
        this.getView().byId("searchTweet").setValue(ACCOUNT);
        this.getView().byId("searchTweet").fireSearch({
          query: ACCOUNT,
        });
      },
      handleTweetSearch: function (oEvent) {
        var sSearchText = oEvent.getParameter("query");
        if (sSearchText) {
          this.getView().getModel("mainModel").setProperty("/busy", true);
          $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/api/search_tweet?account=" + sSearchText + "&count=5",
            dataType: "json",
            success: function (data) {
              this.getView()
                .getModel("mainModel")
                .setProperty("/results", data);
              if (sSearchText !== ACCOUNT) {
                this.getView().getModel("mainModel").setProperty("/delete", []);
              } else {
                this.getView()
                  .getModel("mainModel")
                  .setProperty("/delete", [{ action: ACCOUNT }]);
              }
              this.getView().getModel("mainModel").setProperty("/busy", false);
            }.bind(this),
            error: function (error) {
              this.getView().getModel("mainModel").setProperty("/busy", false);
            }.bind(this),
          });
        } else {
          this.getView()
            .getModel("mainModel")
            .setProperty("/results", { statuses: [] });
          this.getView().getModel("mainModel").setProperty("/busy", false);
        }
      },

      onDeletePressed: function (oEvent) {
        var oBindingContext = (oObject = oEvent
            .getParameter("item")
            .getBindingContext("mainModel")),
          oObject = oBindingContext.getObject(),
          deleteId = oObject.id_str,
          data = { id: deleteId.toString() },
          indx = oBindingContext.getPath().split("/").pop(),
          aTweetCollection = this.getView()
            .getModel("mainModel")
            .getProperty("/results/statuses");

        $.ajax({
          type: "POST",
          contentType: "application/json",
          url: "/api/delete_tweet",
          dataType: "json",
          data: JSON.stringify(data),
          success: function (data) {
            aTweetCollection.splice(indx, 1);
            this.getView()
              .getModel("mainModel")
              .setProperty("/results/statuses", aTweetCollection);
            this.getView().getModel("mainModel").setProperty("/busy", false);
            this.getView().byId("searchTweet").fireSearch({
              query: ACCOUNT,
            });
            MessageToast.show("Tweet deleted");
          }.bind(this),
          error: function (error) {
            MessageToast.show("An error occured deleting the Tweet");
            this.getView().getModel("mainModel").setProperty("/busy", false);
          }.bind(this),
        });
      },
      onPost: function (oEvent) {
        var sText = oEvent.getParameter("value"),
          data = { status: sText };
        $.ajax({
          type: "POST",
          contentType: "application/json",
          url: "/api/post_tweet",
          dataType: "json",
          data: JSON.stringify(data),
          success: function (data) {
            this.getView().byId("searchTweet").setValue(ACCOUNT);
            this.getView().byId("searchTweet").fireSearch({
              query: ACCOUNT,
            });
            this.getView().getModel("mainModel").setProperty("/busy", false);
            MessageToast.show("Tweet posted successfully");
          }.bind(this),
          error: function (error) {
            MessageToast.show("An error occured deleting the Tweet");
            this.getView().getModel("mainModel").setProperty("/busy", false);
          }.bind(this),
        });
      },
      formatDate: function (sDateString) {
        return (
          new Date(sDateString).toDateString() +
          " " +
          new Date(sDateString).toLocaleTimeString()
        );
      },
      formatCount: function (aTweetList) {
        return "Tweets (" + aTweetList.length + ")";
      },
    });

    return MainController;
  }
);
